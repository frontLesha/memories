import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { useState } from "react";
import cn from "classname";

function JournalForm({ submit }) {
  const [isValidForm, setIsValidForm] = useState({
    text: true,
    title: true,
    date: true,
    tag: true,
  });
  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    let isValidForm = true;
    if (!formProps.title?.trim().length) {
      setIsValidForm((state) => ({ ...state, title: false }));
      isValidForm = false;
    } else {
      setIsValidForm((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setIsValidForm((state) => ({ ...state, text: false }));
      isValidForm = false;
    } else {
      setIsValidForm((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setIsValidForm((state) => ({ ...state, date: false }));
      isValidForm = false;
    } else {
      setIsValidForm((state) => ({ ...state, date: true }));
    }
    if (!formProps.tag?.trim().length) {
      setIsValidForm((state) => ({ ...state, tag: false }));
      isValidForm = false;
    } else {
      setIsValidForm((state) => ({ ...state, tag: true }));
    }
    if (!isValidForm) {
      return;
    }
    submit(formProps);
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
        <div className={styles["title"]}>
          <input
            type="text"
            name="title"
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValidForm.title,
            })}
          />
        </div>

        <div className={styles["date"]}>
          <img src="./date.svg" alt="date"></img>
          <p>Date</p>
          <input
            type="date"
            name="date"
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValidForm.date,
            })}
          />
        </div>
        <div className={styles["tag"]}>
          <img src="./tag.svg" alt="tag"></img>
          <p>Tag</p>
          <input
            type="text"
            name="tag"
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValidForm.tag,
            })}
          />
        </div>
        <div className={styles["text"]}>
          <textarea
            name="text"
            id=""
            cols="30"
            rows="15"
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValidForm.text,
            })}
          ></textarea>
        </div>
        <Button text="Save"/>
      </form>
    </>
  );
}

export default JournalForm;
