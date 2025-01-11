import CustomModal from "@/components/ui/custom-modal/customModal";
import React, { useEffect, useState } from "react";
import styles from "./supportModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import formStyles from "../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import { getSupportReasonOptions, raiseSupport } from "../profile.http";
import { toast } from "react-toastify";

const SupportModal = ({
  closeSupport,
  bookingId,
}: {
  closeSupport: () => void;
  bookingId: string;
}) => {
  const [formData, setFormData] = useState({
    reason: "",
    remark: "",
    bookingId,
  });
  const [isRaising, setIsRaising] = useState(false);
  const [reasonOptions, setReasonOptions] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsRaising(true);
    const res = await raiseSupport(formData);
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      toast.success("Support raised successfully!");
    } else {
      toast.error(res.message || "Something went wrong! Please try again.");
    }
    setIsRaising(false);
  };

  function handleInputChange(e: any) {
    const target = e.target;
    const name = target.name;
    console.log(name, target.value);
    setFormData((prev) => {
      return { ...prev, [name]: target.value };
    });
  }

  async function getreasonOptions() {
    const res = await getSupportReasonOptions();
    if (res && res.statusCode === 200) {
      setReasonOptions(res.data);
    }
  }

  useEffect(() => {
    getreasonOptions();
  }, []);

  if (!bookingId) return;
  return (
    <CustomModal>
      <div className={styles.mainWrapper}>
        <span className={styles.crossIcon} onClick={closeSupport}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </span>
        <div className={styles.innerContent}>
          <h4>Support</h4>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={formStyles.formGroup}>
              <label htmlFor="reason" className={formStyles.inputLabel}>
                Select reason
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className={classNames(formStyles.formControl)}
              >
                <option value="">Select a reason</option>
                {reasonOptions?.map((reason) => (
                  <option value={reason} key={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="remark" className={formStyles.inputLabel}>
                Remark
              </label>
              <textarea
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                required
                className={classNames(formStyles.formControl)}
                placeholder="****************"
              />
            </div>
            <button
              type="submit"
              className={formStyles.btnSubmit}
              disabled={!formData.reason || !formData.remark || isRaising}
            >
              {isRaising ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default SupportModal;
