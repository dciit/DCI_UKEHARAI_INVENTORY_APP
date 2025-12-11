import { useContext, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CgEditBlackPoint } from "react-icons/cg";
import moment from "moment";
import { MContext } from "../interface";
import { ThemeContext } from "../router/Routers";
import { Button, Flex, Modal, Select } from "antd";
function DialogFilterDashboard(props: any) {
  const { open, setOpen, year, setYear, month, setMonth, init } = props;
  const [rYear] = useState<string[]>([
    moment().add(-1, "year").year().toString(),
    moment().year().toString(),
    moment().add(1, "year").year().toString(),
  ]);
  const context: MContext = useContext(ThemeContext);
  const _months = context.months;
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="ค้นหาข้อมูล"
      footer={
        <Flex justify="end" gap={8}>
          <Button
            onClick={() => {
              setYear(moment().year().toString());
              setMonth(parseInt(moment().format("MM")));
            }}
            icon={<CgEditBlackPoint />}
          >
            เดือนนี้
          </Button>
          <Button
            type="primary"
            icon={<IoIosSearch />}
            onClick={() => {
              init();
              setOpen(false);
            }}
          >
            ค้นหา
          </Button>
          <Button onClick={() => setOpen(false)}>ปิดหน้าต่าง</Button>
        </Flex>
      }
    >
      <div className="group-search flex gap-2 p-2 bg-white rounded-lg mb-3 ">
        <div className="flex flex-col ">
          <span>Year</span>
          <Select value={year} onChange={(e) => setYear(e)}>
            {rYear.map((oYear: string, iYear: number) => {
              return (
                <Select.Option value={oYear} key={iYear}>
                  {oYear}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col ">
          <span>Month</span>
          <Select
            value={month}
            onChange={(e: any) => {
              setMonth(e);
            }}
          >
            {_months.map((oMonth: string, iMonth: number) => {
              return (
                <Select.Option value={iMonth + 1} key={iMonth + 1}>
                  {oMonth}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
    </Modal>
  );
}

export default DialogFilterDashboard;
