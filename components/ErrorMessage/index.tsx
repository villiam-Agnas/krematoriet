
const ErrorMessage = ({error}: {error:string}) => {
  return (
    <div className="text-red-900 mb-2">{error === "NEXT_REDIRECT" ? "" : error}</div>
  )
}

export default ErrorMessage