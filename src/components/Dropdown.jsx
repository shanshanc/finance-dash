export default function Dropdown({ options, value, onChange }) {
    return (
      <select
        className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm text-center w-full md:w-auto"
        value={value}
        onChange={onChange}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
}
