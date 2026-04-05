<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Translation;
use App\Models\TranslationVersion;

class TranslationController extends Controller
{
    public function store(Request $request)
    {
        $translations = $request->all();
        $modifiedLangs = [];

        if (!is_array($translations)) {
            return response()->json(['error' => 'Invalid data format, expected an array.'], 400);
        }

        foreach ($translations as $item) {
            // Basic validation for each item
            if (isset($item['module'], $item['key'], $item['translate'], $item['language_code'])) {
                // Find existing translation to check for changes
                $existing = Translation::where([
                    'module' => $item['module'],
                    'key' => $item['key'],
                    'language_code' => $item['language_code'],
                ])->first();

                // Only update and mark as modified if there's an actual change
                if (!$existing || $existing->translate !== (string)$item['translate']) {
                    Translation::updateOrCreate(
                        [
                            'module' => $item['module'],
                            'key' => $item['key'],
                            'language_code' => $item['language_code'],
                        ],
                        [
                            'translate' => $item['translate'],
                        ]
                    );
                    $modifiedLangs[$item['language_code']] = true;
                }
            }
        }

        // Update versions for all modified languages
        foreach (array_keys($modifiedLangs) as $langCode) {
            $versionRecord = TranslationVersion::firstOrCreate(
                ['language_code' => $langCode],
                ['version' => 10.0]
            );
            $versionRecord->increment('version', 0.1);
        }

        return response()->json(['message' => 'Translations saved successfully.']);
    }

    public function index(Request $request)
    {
        $langCode = $request->header('x-lang', 'km');

        $translations = Translation::where('language_code', $langCode)->get();

        $data = [];
        foreach ($translations as $translation) {
            if (!isset($data[$translation->module])) {
                $data[$translation->module] = [];
            }
            $data[$translation->module][$translation->key] = $translation->translate;
        }

        // Fetch the current version for the language
        $versionRecord = TranslationVersion::where('language_code', $langCode)->first();
        $version = $versionRecord ? $versionRecord->version : "10.0";

        $data['lang'] = $langCode;
        $data['version'] = (string)$version;

        return response()->json($data);
    }
}
