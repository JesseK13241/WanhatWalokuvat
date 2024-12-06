export default function SelectOption({
  labelText,
  options,
  defaultValue,
  setValue,
}) {
  return (
    <div className="flex w-64 justify-between">
      <label className="font-bold">{labelText}</label>
      <select
        className="mx-2 w-20 rounded bg-primary p-2 text-center shadow-sm"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
      >
        {options}
      </select>
    </div>
  )
}
