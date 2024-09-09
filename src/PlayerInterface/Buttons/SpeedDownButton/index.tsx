export function SpeedDownButton(props: { onClick(): void }) {
  return (
    <button type="button" class="hlv-button" onClick={() => props.onClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>Speed Down</title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 5v14l-8 -7z" />
        <path d="M10 5v14l-8 -7z" />
      </svg>
    </button>
  )
}
