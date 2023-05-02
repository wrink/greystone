export const Table = ({ columns = [], rows = [], pages = -1, currentPage = 0 }) => (
  <div className='border rounded-2'>
    <table className='table table-striped mb-0'>
      <thead>
        <tr>
          {columns.map(({ label }, i) => (
            <th scope='col' key={i}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(({ key, format }, j) => (
              <td key={j}>
                {
                  (format) ? format(row) : row[key]
                }
              </td>
            ))}
          </tr>
        ))}
        {!rows.length && (
          <p>
            No Results
          </p>
        )}
      </tbody>
    </table>
  </div>
)