interface CheckboxListProps {
  items: string[]
  selection: string[]
  setSelection: React.Dispatch<React.SetStateAction<string[]>>
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  selection,
  setSelection,
}: {
  items: string[]
  selection: string[]
  setSelection: any
}) => (
  <div className="w-full h-auto p-2 rounded-xl shadow-light-mode-101 mt-3">
    {items.map((item: any, index: any) => (
      <div key={index} className="flex gap-4 mb-4 p-2">
        <input
          type="checkbox"
          id="cb1"
          className="bg-black text-white border border-black"
          checked={selection.includes(item)}
          name={item}
          onChange={() => {
            const updatedSelection = selection.includes(item)
              ? selection.filter((selected: any) => selected !== item)
              : [...selection, item]
            setSelection(updatedSelection)
          }}
        />

        <h5
          onClick={() => {
            const updatedSelection = selection.includes(item)
              ? selection.filter((selected: any) => selected !== item)
              : [...selection, item]
            setSelection(updatedSelection)
          }}
          className="text-dark font-semibold text-base capitalize"
        >
          {item}
        </h5>
      </div>
    ))}
  </div>
)
export default CheckboxList
