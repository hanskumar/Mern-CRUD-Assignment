import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Home = () => {
  const [users, setUser] = useState([]);
  const { SearchBar } = Search;
  let history = useHistory();

  const formatButton = (cell, row, rowIndex, formatExtraData) => {
    if(row._id) {
        return (
            <>
                <div>
                    <Link className="btn btn-sm btn-success" to={`/users/edit/${row._id}`}>Edit</Link>
                    
                    <Link className="btn btn-sm btn-danger" onClick={() => {
                      if(window.confirm('Are you sure to delete this record?')){ 
                        deleteUser(row._id)
                      };
                    }}>Delete </Link>

                </div>
            </>
        )
    }
  }


  // ================================ Table data load =========================================
  const columns = [
      
      { dataField: '_id', text: 'Id', sort: true, },
      {
        
        dataField: 'name', text: 'name', sort: true,
        classes: (cell, row, rowIndex, colIndex) => {
          if (rowIndex % 2 === 0) return 'row-even'; return 'row-odd';
        }
      },
      { dataField: 'phone', text: 'phone'},
      { dataField: 'email', text: 'email'},
      { dataField: 'createdAt', text: 'createdOn', sort: true },
      { dataField: '_id', text: 'Action', formatter: formatButton }
  ]


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/v1/users");
    console.log("Return Data::",result.data);
    setUser(result.data.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:4000/v1/user/${id}`);
    loadUsers(); 
  };

  return (
    <div className="container">
      <div className="">
        <h1>Users List</h1>

          <ToolkitProvider
                keyField="username"
                key="id"
                data={ users }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps }
                        className="input-group"
                        style={ { color: 'black' } }
                        delay={ 1000 }
                        placeholder="Search"
                        />
                        <hr />
                        <BootstrapTable
                        { ...props.baseProps }
                        pagination={ paginationFactory() }
                        hover
                        striped
                        condensed
                        noDataIndication="Table is Empty"
                        headerWrapperClasses="foo"
                        />
                    </div>
                    )
                }
                </ToolkitProvider>
        
      </div>
    </div>
  );
};

export default Home;
