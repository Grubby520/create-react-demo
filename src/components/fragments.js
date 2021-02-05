import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableList:[]
    }
  }

  componentDidMount() {
    this.getTableList().then(res => {
      this.setState({
        tableList: res.list || []
      })
    })
  }

  getTableList() {
    return new Promise(resolve => {
      resolve({
        list: [
          {
            name: 'fragment',
            age: 14
          },
          {
            name: 'fragment',
            age: 14
          }
        ]
      })
    })
  }

  render() {
    const { tableList } = this.state;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {
              tableList.map(item => (
                <React.Fragment>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                  </tr>
                </React.Fragment>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
