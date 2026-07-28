import { useNavigate } from '@tanstack/react-router'
import {
  CircleAlertIcon,
  FileTextIcon,
  Trash2Icon,
  UploadCloudIcon,
  UploadIcon,
} from 'lucide-react'
import {
  type ChangeEvent,
  type SubmitEvent,
  useId,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCreatePatientsFromCsv } from '@/hooks/http/patient/use-create-patients-from-csv'
import { cn, formatBytes } from '@/lib/utils'

export function CreatePatientsFromCsvForm() {
  const MAX_ROWS = 1000
  const MAX_FILE_SIZE_MB = 5

  const inputId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const navigate = useNavigate()
  const createPatientsFromCsvMutation = useCreatePatientsFromCsv()

  function handleResetFile() {
    setFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleValidateAndSetFile(candidate: File) {
    const isCsv =
      candidate.type === 'text/csv' ||
      candidate.name.toLowerCase().endsWith('.csv')

    if (!isCsv) {
      setError('Arquivo inválido')

      return
    }

    if (candidate.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Tamanho do arquivo excede o limite de ${MAX_FILE_SIZE_MB} MB`)

      return
    }

    if (error) {
      setError(null)
    }

    setFile(candidate)
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)

    const dropped = event.dataTransfer.files?.[0]
    if (dropped) {
      handleValidateAndSetFile(dropped)
    }
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]

    if (selected) {
      handleValidateAndSetFile(selected)
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    if (!file) {
      return
    }

    await createPatientsFromCsvMutation.mutateAsync({ file })

    toast.success('Arquivo enviado com sucesso')
    navigate({ to: '/patients' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {file && (
        <div className="space-y-6">
          <div
            data-error={!!error}
            className="flex items-center justify-between gap-3 p-4 rounded-xl border data-[error=true]:border-destructive"
          >
            <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
              <FileTextIcon className="size-6 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)}
              </p>
            </div>

            <Button
              type="button"
              size="icon-lg"
              variant="destructive"
              onClick={handleResetFile}
            >
              <Trash2Icon />
            </Button>
          </div>

          {error && (
            <div className="-mt-4 flex items-center gap-x-1 text-sm text-destructive">
              <CircleAlertIcon className="size-4" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" size="lg" className="px-6">
            <UploadIcon />

            <span>Enviar arquivo</span>
          </Button>
        </div>
      )}

      {!file && (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors',
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary'
          )}
        >
          <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
            <UploadCloudIcon className="size-6 text-primary" />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">
              Arraste o arquivo CSV aqui ou clique para selecionar
            </p>
          </div>

          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileInputChange}
            className="sr-only"
          />
        </label>
      )}

      <div className="space-y-2">
        <h3 className="text-base font-medium">Observações:</h3>
        <ol className="ml-4 space-y-1 list-decimal text-sm text-muted-foreground">
          <li>
            Veja o exemplo abaixo para não ter problemas ao submeter o arquivo;
          </li>
          <li>Linhas inválidas bloqueiam a importação inteira;</li>
          <li>Limite de {MAX_FILE_SIZE_MB} MB por arquivo;</li>
          <li>
            Limite de {MAX_ROWS.toLocaleString('pt-BR')} pacientes por arquivo.
          </li>
        </ol>
      </div>
    </form>
  )
}
