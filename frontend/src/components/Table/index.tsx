export default function Index({data} : {data: []}) {
  return (
    <section>
      <div className="table-responsive" style={{ height: "40vh", overflowY: "scroll" }}>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">
                <small>nome</small>
              </th>
              <th scope="col">
                <small>Email</small>
              </th>
              <th scope="col">
                <small>Cpf</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 &&
              data!.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.cpf}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
