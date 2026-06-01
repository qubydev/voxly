'use client'
import { Slider } from '@/components/ui/slider'

function SettingSlider({ label, min = 0, max = 100, value, onChange, leftLabel, rightLabel }) {
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
                <span className="text-xs text-muted-foreground">{value}</span>
            </div>
            <Slider
                min={min}
                max={max}
                step={1}
                value={[value]}
                onValueChange={v => onChange(v[0])}
                className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
        </div>
    )
}

export default function TTSSettings({ settings, onChange }) {
    return (
        <div className="flex flex-col gap-6">
            <SettingSlider
                label="Speed"
                value={settings.speed}
                onChange={v => onChange({ ...settings, speed: v })}
                leftLabel="Slower"
                rightLabel="Faster"
            />
            <SettingSlider
                label="Stability"
                value={settings.stability}
                onChange={v => onChange({ ...settings, stability: v })}
                leftLabel="More variable"
                rightLabel="More stable"
            />
            <SettingSlider
                label="Similarity"
                value={settings.similarity}
                onChange={v => onChange({ ...settings, similarity: v })}
                leftLabel="Low"
                rightLabel="High"
            />
        </div>
    )
}