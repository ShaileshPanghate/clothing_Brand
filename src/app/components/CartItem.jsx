export default function CartItem({ item, updateQuantity, removeItem }) {
  return (
    <div className="flex gap-4 border rounded-lg p-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-28 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="font-semibold mt-1">₹{item.price}</p>

        <div className="flex items-center gap-4 mt-3">
          <select
            value={item.quantity}
            onChange={e =>
              updateQuantity(item.id, Number(e.target.value))
            }
            className="border rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map(qty => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
