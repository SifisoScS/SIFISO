import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  onRunClick: () => void
}

export function CodeEditor({
  value,
  onChange,
  onRunClick,
}: CodeEditorProps) {
  return (
    <div className="space-y-3">
      <div className="border rounded overflow-hidden">
        <Editor
          height="300px"
          defaultLanguage="python"
          theme="vs-dark"
          value={value}
          onChange={(value) => onChange(value ?? '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      <button
        onClick={onRunClick}
        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
      >
        Run Code
      </button>
    </div>
  )
}
