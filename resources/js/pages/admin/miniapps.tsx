import * as React from 'react';
import { useForm, usePage } from '@inertiajs/react';

interface MiniApp {
    id: string;
    name: string;
    version: string;
    description: string;
    icon_url: string | null;
    bundle_hash: string;
    required_role: string | null;
    created_at: string;
}

export default function MiniAppsAdmin() {
    const { miniApps, availableRoles, flash } = usePage<{
        miniApps: MiniApp[],
        availableRoles: string[],
        flash: { success: string | null }
    }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        name: '',
        version: '',
        description: '',
        bundle: null as File | null,
        icon: null as File | null,
        required_role: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/miniapps', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-rose-600/20 blur-[120px] rounded-full"></div>
            </div>

            {/* Navbar / Header */}
            <header className="relative border-b border-white/10 bg-slate-900/50 backdrop-blur-xl z-20 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">Super App Registry</h1>
                            <p className="text-xs text-slate-400 font-medium">Over-The-Air Mini-App Management</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                
                {flash?.success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md p-4 rounded-2xl flex items-center animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex-shrink-0 bg-emerald-500/20 p-2 rounded-full">
                            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm font-medium text-emerald-300">{flash.success}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Upload Form */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 transition-all duration-300 hover:border-white/20">
                            <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                Upload New Bundle
                            </h2>
                            
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">App ID (Unique)</label>
                                    <input type="text" value={data.id} onChange={e => setData('id', e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl shadow-inner py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-slate-500"
                                        placeholder="e.g. food_delivery_app" />
                                    {errors.id && <p className="mt-1.5 text-xs text-rose-400">{errors.id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl shadow-inner py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                                        {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Version</label>
                                        <input type="text" value={data.version} onChange={e => setData('version', e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl shadow-inner py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-slate-500"
                                            placeholder="1.0.0" />
                                        {errors.version && <p className="mt-1.5 text-xs text-rose-400">{errors.version}</p>}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                    <textarea value={data.description} onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl shadow-inner py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                                        rows={2} />
                                    {errors.description && <p className="mt-1.5 text-xs text-rose-400">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Required Role</label>
                                    <select value={data.required_role} onChange={e => setData('required_role', e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl shadow-inner py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none">
                                        <option value="" className="bg-slate-800">-- All Roles (Public) --</option>
                                        {availableRoles?.map(role => (
                                            <option key={role} value={role} className="bg-slate-800">{role}</option>
                                        ))}
                                    </select>
                                    {errors.required_role && <p className="mt-1.5 text-xs text-rose-400">{errors.required_role}</p>}
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Icon Image</label>
                                        <input type="file" accept="image/*" onChange={e => setData('icon', e.target.files?.[0] || null)}
                                            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 file:transition-colors file:cursor-pointer cursor-pointer" />
                                        {errors.icon && <p className="mt-1.5 text-xs text-rose-400">{errors.icon}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Bundle (.zip) *</label>
                                        <input type="file" accept=".zip" onChange={e => setData('bundle', e.target.files?.[0] || null)}
                                            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500/10 file:text-fuchsia-400 hover:file:bg-fuchsia-500/20 file:transition-colors file:cursor-pointer cursor-pointer" />
                                        {errors.bundle && <p className="mt-1.5 text-xs text-rose-400">{errors.bundle}</p>}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-white/10">
                                    <button type="submit" disabled={processing}
                                        className="w-full relative group overflow-hidden flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]">
                                        <span className="relative z-10 flex items-center">
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Uploading...
                                                </>
                                            ) : (
                                                'Publish Mini-App'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Apps List */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {miniApps?.length === 0 ? (
                            <div className="bg-slate-800/30 border border-white/5 backdrop-blur-sm rounded-3xl p-12 text-center border-dashed">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4 shadow-inner">
                                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">No Applications Deployed</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">Build your first React-Vite web bundle and upload it here to make it available inside your Flutter edge instantly.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {miniApps?.map((app) => (
                                    <div key={app.id} className="group bg-slate-800/40 backdrop-blur-lg border border-white/5 hover:border-indigo-500/30 rounded-3xl p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all duration-500"></div>
                                        
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                                                    {app.icon_url ? (
                                                        <img className="relative h-14 w-14 rounded-2xl object-cover shadow-lg border border-white/10" src={`/storage/${app.icon_url}`} alt={app.name} />
                                                    ) : (
                                                        <div className="relative h-14 w-14 rounded-2xl bg-slate-700 border border-white/10 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                            {app.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{app.name}</h3>
                                                    <p className="text-xs text-slate-400 font-mono mt-0.5">{app.id}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                                    v{app.version}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="mt-4 text-sm text-slate-300 line-clamp-2 min-h-[40px] relative z-10">
                                            {app.description || <span className="text-slate-500 italic">No description provided.</span>}
                                        </p>
                                        
                                        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                                            <div className="flex items-center space-x-2">
                                                {app.required_role ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20">
                                                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                        {app.required_role} Only
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                                                        Public App
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mono truncate max-w-[120px]" title={app.bundle_hash}>
                                                <span className="opacity-50">#</span>{app.bundle_hash.substring(0, 8)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
