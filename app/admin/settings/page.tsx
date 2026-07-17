'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle } from 'lucide-react';

const SETTING_KEYS = [
    { key: 'site_name', label: 'Site Name', type: 'text' },
    { key: 'tagline', label: 'Main Tagline', type: 'text' },
    { key: 'contact_email', label: 'General Contact Email', type: 'email' },
    { key: 'engineering_email', label: 'Engineering Enquiries Email', type: 'email' },
    { key: 'partnerships_email', label: 'Partnerships Email', type: 'email' },
    { key: 'twitter_url', label: 'Twitter / X URL', type: 'url' },
    { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
    { key: 'github_url', label: 'GitHub URL', type: 'url' },
    { key: 'headquarters', label: 'Headquarters Description', type: 'text' },
    { key: 'established_year', label: 'Year Established', type: 'text' },
];

export default function AdminSettingsPage() {
    const [values, setValues] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        supabase.from('site_settings').select('key, value')
            .then(({ data }) => {
                const map: Record<string, string> = {};
                (data || []).forEach(row => { map[row.key] = row.value || ''; });
                setValues(map);
                setLoading(false);
            });
    }, []);

    const save = async () => {
        setSaving(true);
        const updates = SETTING_KEYS.map(({ key }) => ({
            key,
            value: values[key] || '',
            updated_at: new Date().toISOString(),
        }));
        for (const u of updates) {
            await supabase.from('site_settings').upsert(u, { onConflict: 'key' });
        }
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (loading) return <p className="text-obsidian-400">Loading settings...</p>;

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-white mb-1">Site Settings</h1>
                <p className="text-obsidian-400 text-sm">Global settings for the Chechnology website</p>
            </div>

            <div className="glass-card border border-white/8 p-8 rounded-2xl space-y-5">
                {SETTING_KEYS.map(({ key, label, type }) => (
                    <div key={key}>
                        <label className="form-label">{label}</label>
                        <input
                            type={type}
                            className="form-input"
                            value={values[key] || ''}
                            onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={`Enter ${label.toLowerCase()}...`}
                        />
                    </div>
                ))}

                {saved && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        <CheckCircle size={15} /> Settings saved successfully!
                    </div>
                )}

                <button onClick={save} disabled={saving} className="btn-primary w-full justify-center">
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
