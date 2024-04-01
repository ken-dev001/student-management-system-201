import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { payCourseFee, getStudentFees, deleteFee } from "../../utils/marketplace";
import AddFee from "./AddFee";
import FeeCard from "./FeeCard";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);
  const addNewFee = async (data) => {
    try {
      setLoading(true);
      const amountStr = data.amount
      data.amount = parseInt(amountStr);
      await payCourseFee(data);
      toast(<NotificationSuccess text="Fee paid successfully." />);
      await fetchFees();
    } catch (error) {
      console.error("Error adding fee:", error);
      toast(<NotificationError text="Failed to pay fee." />);
    } finally {
      setLoading(false);
    }
  };

  const fetchFees = async () => {
    try {
      setLoading(true);
      const fetchedFees = await getStudentFees();
      setFees(fetchedFees);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFee = async (feeId) => {
    try {
      setLoading(true);
      await deleteFee(feeId);
      toast(<NotificationSuccess text="Fee deleted successfully." />);
      await fetchFees();
    } catch (error) {
      console.error("Error deleting fee:", error);
      toast(<NotificationError text="Failed to delete fee." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Fees</h1>
        <AddFee save={addNewFee} />
      </div>
       
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {fees.map((fee) => (
            <div key={fee.id}>
              <FeeCard  fee={fee} onDelete={handleDeleteFee} />
            </div>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Fees;
