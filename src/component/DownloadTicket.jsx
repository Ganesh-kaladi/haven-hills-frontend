import axios from "axios";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";

function DownloadTicket({ bookingID }) {
  const { token } = useSelector((state) => state.auth);
  async function downloadRecepit() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5235/api/v1/booking/download-ticket/${bookingID}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket-${bookingID}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
  return (
    <button
      className="flex items-center justify-center gap-2 w-full bg-amber-400 hover:bg-amber-600 py-1 mt-3 rounded-lg cursor-pointer"
      onClick={downloadRecepit}
    >
      <ArrowDown /> Download Receipt
    </button>
  );
}

export default DownloadTicket;
