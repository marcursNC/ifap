export function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-1 duration-200">
      <p className="max-w-[85%] whitespace-pre-wrap text-pretty rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[15px] leading-relaxed text-primary-foreground">
        {content}
      </p>
    </div>
  )
}
