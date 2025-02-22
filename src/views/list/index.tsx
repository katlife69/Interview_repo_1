import React, { useEffect, useState } from "react";
import { deleteJobApi, getListJobsApi } from "../../api/jobs";
import { IJobDto } from "../../interface/job/job.dto";
import { Button, IconButton, List, ListItem, ListItemText, Pagination, Snackbar, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveItem from "./components/SaveItem";

const DEFAULT_LIMIT = 10;

const STATUS_TEXT = ["Chưa hoàn thành", "Đang thực hiện", "Hoàn thành"];

const ListJob = () => {
  const [listJobs, setListJobs] = useState<IJobDto[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [idItem, setIdItem] = useState<string | null>(null);
  const [snackbarInfo, setSnackbarInfo] = useState<string | null>(null);

  useEffect(() => {
    getCountListJobs();
  }, []);

  useEffect(() => {
    getListJobs();
  }, [page]);

  const getCountListJobs = async () => {
    try {
      const res = await getListJobsApi();
      setTotal(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getListJobs = async () => {
    try {
      const res = await getListJobsApi({
        _page: page,
        _limit: DEFAULT_LIMIT,
        title: searchTitle || undefined,
      });
      setListJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = async () => {
    getListJobs();
  };

  const onChangePage = (_, value) => {
    setPage(value);
    console.log("Trang hiện tại:", value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJobApi(id);
      setSnackbarInfo("Xóa dữ liệu thành công");
      refetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const refetchData = () => {
    getListJobs();
    getCountListJobs();
  };

  const handleAdd = () => {
    setIdItem("0");
  };

  const handleEdit = (id: string) => {
    setIdItem(id);
  };

  return (
    <div className="container m-auto max-w-[1200px]">
      <div className="flex mt-3 gap-3">
        <TextField
          className="flex-1"
          id="outlined-basic"
          label="Tiêu đề"
          variant="outlined"
          size="small"
          value={searchTitle}
          onChange={handleChangeSearchValue}
        />
        <Button variant="contained" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>
      <List className="flex flex-col gap-3">
        {listJobs.map((item) => {
          return (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={item.id}
              className="border rounded-xl bg-gray-200"
            >
              <ListItemText
                primary={`${item.title} - ${STATUS_TEXT[item.status]}`}
                secondary={item.description}
                className="cursor-pointer"
                onClick={() => {
                  handleEdit(item.id);
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <Pagination count={Math.ceil(total / 10)} page={page} onChange={onChangePage} />
      {idItem !== null && (
        <SaveItem
          idItem={idItem}
          handleClose={() => setIdItem(null)}
          refetch={() => refetchData()}
          setToastInfo={(value) => setSnackbarInfo(value)}
        />
      )}
      <Snackbar open={snackbarInfo !== null} onClose={() => setSnackbarInfo(null)} message={snackbarInfo} autoHideDuration={1200} />
    </div>
  );
};

export default ListJob;
