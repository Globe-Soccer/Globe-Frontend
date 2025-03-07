import React, { useEffect, useState } from "react";
import { items } from "../../../../../../../utils/data";
import AxiosInstance from "../../../../../../../api/axios";

const Fixture = () => {
  const [loading, setLoading] = useState(false);
  const [parentItem, setParentItem] = useState([] as any);

  const fetchFixture = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get(`/game/createFixture`);
      if (Array.isArray(res.data)) {
        setParentItem(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixture();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const data = Array.isArray(parentItem) ? parentItem : [parentItem];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    handlePageChange(Math.min(currentPage + 1, totalPages - 1));
  };

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <div className="h-[70px] w-full bg-white shadow flex justify-center items-center gap-1">
        <button
          onClick={handlePreviousPage}
          className={`border border-black py-1 w-[140px] xs:w-[180px] rounded-[5px] font-semibold ${
            currentPage === 0 ? "disabled text-[#f0f0f0] bg-[#66666675]" : "text-[#666] bg-[#f0f0f0]"
          }`}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`border border-black py-1 w-[140px] xs:w-[180px] rounded-[5px] font-semibold ${
            currentPage === totalPages - 1 ? 'disabled text-[#f0f0f0] bg-[#66666675]' : 'text-[#666] bg-[#f0f0f0]'
          }`}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>

      <table className="w-[100%] text-[12px] sm:text-[14px] text-black bg-white">
        <thead className=" w-[100%] py-1 font-semibold bg-[#EEEEEE]">
          <td className="px-1 border w-full">
            <div className="flex justify-start gap-1 px-5 items-center h-[40px]">
              Matchweek 14:{" "}
              <span className="text-gray-600">JUN 13 WED 2024</span>
            </div>
          </td>
          <td className="px-1 w-full" />
        </thead>

        <>
          {currentItems.map((item: any) => (
            <tr className="bg-white hover:bg-[#EEEEEE] font-semibold border-b border-[#bbbbbb76] h-[40px] py-4">
              <td className="  ">
                <div className="flex justify-around xs:justify-center items-center py-2 gap-2 xs:gap-14 font-normal">
                  <div className="px-1 w-full">
                    <p className="text-[15px] hover:underline cursor-pointer text-center">
                      {item.homeTeam}
                    </p>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="px-1  cursor-pointer flex gap-1 justify-center items-center border border-gray-300 text-[#666] hover:bg-[#817c7cb7] hover:text-white font-semibold w-[75px] rounded-[5px] h-[40px]">
                      21:00
                    </div>
                  </div>
                  <div className="px-1 w-full">
                    <p className="text-[15px] hover:underline cursor-pointer text-center">
                      {item.awayTeam}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </>
      </table>
    </div>
  );
};

export default Fixture;
