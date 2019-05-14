import React, { useState, useCallback } from "react";
import FieldRange from "@atlaskit/field-range";
import { DateTimePicker } from "@atlaskit/datetime-picker";
import "./styles.css";
import request from "../../utils/request";

function AddPoint({ onAddPoint }) {
  const [rangeValue, setRangeValue] = useState(0);
  const [dateTime, setDateTime] = useState("2018-04-19T10:00:00+00:00");
  const [isError, setIsError] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);

  const onValueChange = useCallback(value => setRangeValue(value), []);
  const onDateChange = useCallback(value => setDateTime(value), []);

  const onAddPointClick = useCallback(() => {
    const point = { x: dateTime, y: rangeValue };
    request("/points", { method: "post", body: JSON.stringify(point) })
      .then(() => {
        onAddPoint(point);
        setIsSuccess(true);
        setIsError(false);
        setRangeValue(0);
        setDateTime("2018-04-19T10:00:00+00:00");
        setTimeout(() => setIsSuccess(false), 2000);
      })
      .catch(() => {
        setIsError(true);
        setIsSuccess(false);
      });
  }, [rangeValue, dateTime]);

  return (
    <div className="add-point">
      <span className="add-point__value--label">Select Value</span>
      <div className="add-point__value center-block">
        <FieldRange
          value={rangeValue}
          min={-20}
          max={20}
          step={1}
          onChange={onValueChange}
        />
        <span className="add-point__value--value">{rangeValue}</span>
      </div>
      <div className="add-point__date">
        <span className="add-point__date--label">Select date and time</span>
        <DateTimePicker
          defaultValue={dateTime}
          onChange={onDateChange}
          timeIsEditable
        />
      </div>
      <div className="add-point__button">
        <div className="add-point__feedback">
          {isError && (
            <span className="add-point__feedback--error">
              Oppsss, something went wrong while adding point
            </span>
          )}
          {isSucess && (
            <span className="add-point__feedback--success">
              Point added successfully
            </span>
          )}
        </div>
        <button onClick={onAddPointClick}>Add point</button>
      </div>
    </div>
  );
}

export default AddPoint;
