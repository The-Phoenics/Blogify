export const Spinner = props => {
  const stylingClasses: string = props.className
  const color: string = props.color

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${stylingClasses}`}
    >
      <div
        className={`border-4 border-t-transparent border-${color} animate-spin rounded-full`}
      ></div>
    </div>
  )
}
