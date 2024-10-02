import React, { useEffect, useState } from "react";
import { Button, Table, Spin, Alert, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EntryModal from "../components/EntryModal";
import { useSelector } from "react-redux";
import { fetchEntries, createEntry, updateEntry, removeEntry } from "../store/entriesSlice";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import moment from "moment";

const { Option } = Select;

const BudgetPlanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { incomeData, expenseData, loading, error } = useSelector(
    (state: RootState) => state.entries
  );

  const [isIncome, setIsIncome] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

  
  const [monthFilter, setMonthFilter] = useState<any | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const filteredData = (data: any[]) => {
    return data.filter(entry => {
      const isMonthMatch = !monthFilter || moment(entry.date).isSame(monthFilter, 'month');
      const isCategoryMatch = !categoryFilter || entry.category === categoryFilter;
      return isMonthMatch && isCategoryMatch;
    });
  };

  const handleResetFilters = () => {
    setMonthFilter(null);
    setCategoryFilter(null);
  };


  const categories = Array.from(new Set(expenseData.map(entry => entry.category)));

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => date.slice(0, 10),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <EditOutlined onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
          <DeleteOutlined onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  const handleDelete = (_id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        dispatch(removeEntry({ _id, type: isIncome ? "income" : "expense" }));
      },
    });
  };

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setIsModalVisible(true);
  };

  const handleSaveEntry = (entry: any) => {
    const formattedDate = entry.date.split("T")[0];
    const updatedEntry = { ...entry, date: formattedDate };

    if (entry._id) {
      dispatch(updateEntry({ entry: updatedEntry, type: isIncome ? "income" : "expense" }));
    } else {
      dispatch(createEntry({ entry: updatedEntry, type: isIncome ? "income" : "expense" }));
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedEntry(null);
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <div className="flex justify-between mt-4">
        <div className="flex mb-4">
          <Button
            type={isIncome ? "primary" : "default"}
            onClick={() => setIsIncome(true)}
            style={{ marginRight: 8 }}
          >
            Income
          </Button>
          <Button
            type={!isIncome ? "primary" : "default"}
            onClick={() => setIsIncome(false)}
          >
            Expenses
          </Button>
        </div>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Add
        </Button>
      </div>

      {!isIncome && (
        <div style={{ marginBottom: 16 }}>
          <Select
            placeholder={<span style={{ color: '#001529' }}>Select Month</span>}
            style={{ width: 120, marginRight: 8 }}
            onChange={(month) => setMonthFilter(month)}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <Option key={index} value={moment().subtract(index, 'months').format('YYYY-MM')}>
                {moment().subtract(index, 'months').format('MMMM YYYY')}
              </Option>
            ))}
          </Select>

          <Select
            style={{ width: 120 }}
            onChange={(category) => setCategoryFilter(category)}
            dropdownStyle={{ color: 'gray' }}
            placeholder={<span style={{ color: '#001529' }}>Select Category</span>}
          >
            {categories.map((category: string) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>

          <Button onClick={handleResetFilters} style={{ marginLeft: 8 }}>
            Reset Filters
          </Button>
        </div>
      )}

      {loading ? (
        <Spin />
      ) : error ? (
        <Alert message="Error" description={error} type="error" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData(isIncome ? incomeData : expenseData)}
          rowKey="_id"
        />
      )}

      <EntryModal
        visible={isModalVisible}
        entry={selectedEntry}
        onSave={handleSaveEntry}
        onCancel={resetForm}
      />
    </div>
  );
};

export default BudgetPlanner;
