import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import PageMenu from "../../components/pageMenu/PageMenu";
import "./userList.scss";
import UserStat from "../../components/userStats/UserStat";
import InfoBox from "../../components/infoBox/InfoBox";
import Search from "../../components/search/Search";
import ChangeRole from "../../components/changerole/ChangeRole";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile/Profile";
import { Spinner } from "../../components/loader/Loader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EMAIL_RESET } from "../../redux/email/emailSlice";
import { FILTER_USERS, selectUsers } from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";

const UserList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

const [search, setSearch] = useState('')

  const { isLoggedIn, isError, isSuccess, isLoading, message, user, users } = useSelector((state) => state.auth);

  const filteredusers = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
await dispatch(deleteUser(id))
    dispatch(getUsers());

  }


const confirmDelete = (_id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure to do this?.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeUser(_id)
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        }
      ]
    })}

     useEffect(() => {
       dispatch(FILTER_USERS({users, search}));
     }, [dispatch, users, search]);


     //begin pagination
     const itemsPerPage =2
   const [itemOffset, setItemOffset] = useState(0);

     const endOffset = itemOffset + itemsPerPage;
     const currentItems = filteredusers?.slice(itemOffset, endOffset);
     const pageCount = Math.ceil(filteredusers?.length / itemsPerPage);

    
     const handlePageClick = (event) => {
       const newOffset = (event.selected * itemsPerPage) % filteredusers.length;
            setItemOffset(newOffset);
     };
  
     //end pagination
  
  
  return (
    <section>
      <div className="container">
        <PageMenu />
        <UserStat />

        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>

            {!isLoading && users?.length < 0 ? (
              <p>No User Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((user, index) => {
                    const { _id, name, email, role } = user;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name, 8)}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole _id={_id} email={email} />
                        </td>
                        <td>
                          <span>
                            <FaTrashAlt
                              onClick={() => {
                                confirmDelete(_id);
                              }}
                              size={20}
                              color="red"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <hr />
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}

            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="page-num"
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;
