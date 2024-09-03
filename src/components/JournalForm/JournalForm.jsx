import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { useEffect, useReducer, useRef } from "react";
import cn from "classname";
import { formReducer, INITIAL } from "./JournalForm.state";

function JournalForm({ submit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL);
    const { isReady, values, isValid } = formState;
    const titleRef = useRef();
    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.title || !isValid.text || !isValid.tag) {
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [formState]);

    useEffect(() => {
        if (isReady) {
            submit(values);
            dispatchForm({ type: "CLEAR" });
        }
    }, [isReady, submit, values]);

    const addJournalItem = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        formProps.event = event;
        dispatchForm({ type: "SUBMIT", payload: formProps });
    };

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div className={styles["title"]}>
                    <input
                        type='text'
                        name='title'
                        className={cn(styles["input"], {
                            [styles["invalid"]]: !isValid.title,
                        })}
                    />
                </div>

                <div className={styles["date"]}>
                    <img src='./date.svg' alt='date'></img>
                    <p>Date</p>
                    <input
                        type='date'
                        name='date'
                        className={cn(styles["input"], {
                            [styles["invalid"]]: !isValid.date,
                        })}
                    />
                </div>
                <div className={styles["tag"]}>
                    <img src='./tag.svg' alt='tag'></img>
                    <p>Tag</p>
                    <input
                        type='text'
                        name='tag'
                        className={cn(styles["input"], {
                            [styles["invalid"]]: !isValid.tag,
                        })}
                    />
                </div>
                <div className={styles["text"]}>
                    <textarea
                        name='text'
                        id=''
                        cols='30'
                        rows='15'
                        className={cn(styles["input"], {
                            [styles["invalid"]]: !isValid.text,
                        })} 
                    ></textarea>
                </div>
                <Button text='Save' />
            </form>
        </>
    );
}

export default JournalForm;
