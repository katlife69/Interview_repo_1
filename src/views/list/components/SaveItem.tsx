import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { addJobApi, getJobByIdApi, updateJobApi } from "../../../api/jobs";

const SaveItem = ({
  idItem,
  handleClose,
  refetch,
  setToastInfo,
}: {
  idItem: string | null;
  handleClose: () => void;
  refetch: () => void;
  setToastInfo: (value: string) => void;
}) => {
  const defaultValues = {
    title: "",
    description: "",
    status: 0,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (idItem !== "0" && idItem) {
      getJobById(idItem);
    }
  }, []);

  const getJobById = async (id: string) => {
    try {
      const res = await getJobByIdApi(id);
      const data = res.data;
      reset({
        title: data.title,
        description: data.description,
        status: data.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (idItem !== "0" && idItem) {
        await updateJobApi(idItem, data);
        setToastInfo("Cập nhật dữ liệu thành công");
      } else {
        await addJobApi(data);
        setToastInfo("Thêm mới dữ liệu thành công");
      }
      handleClose();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={idItem !== null} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {idItem !== "0" ? "Cập nhật" : "Thêm mới"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-3">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Trường này là bắt buộc!",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="Mời bạn chọn"
                  label="Tiêu đề"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  size={"small"}
                  className="w-full"
                />
              )}
            />
            {errors.title && <small className="text-red-500">{errors.title.message}</small>}
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Trường này là bắt buộc!",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="Mời bạn chọn"
                  label="Mô tả"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  size={"small"}
                  className="w-full"
                />
              )}
            />
            {errors.description && <small className="text-red-500">{errors.description.message}</small>}
          </div>
          <div>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className="w-full"
                  >
                    <MenuItem value={0}>Chưa hoàn thành</MenuItem>
                    <MenuItem value={1}>Đang thực hiện</MenuItem>
                    <MenuItem value={2}>Hoàn thành</MenuItem>
                  </Select>
                </>
              )}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SaveItem;
