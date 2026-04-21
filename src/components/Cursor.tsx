export function Cursor() {
  return (
    <span
      className="cursor-blink inline-block w-[2px] h-[1.1em] rounded-full align-middle ml-[1px]"
      style={{
        backgroundColor: 'var(--terminal-primary)',
        boxShadow: '0 0 8px var(--terminal-primary)',
      }}
      aria-hidden="true"
    />
  )
}
