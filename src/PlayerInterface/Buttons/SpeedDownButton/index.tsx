export function SpeedDownButton(props: { onClick(): void }) {
  return (
    <button type="button" class="hlv-button" onClick={() => props.onClick()} style={{ transform: 'rotate(180deg)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentcolor">
        <title>Speed Down</title>
        <path d="M0 0 L0 64 L32 32 L32 64 L64 32 L32 0 L32 32 Z" />
      </svg>
    </button>
  )
}
