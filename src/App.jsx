import "./components/Button/Button.jsx";
import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import { useEffect, useState } from "react";

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
		let data
		try {
			data = JSON.parse(localStorage.getItem("data"));
		} catch (err) {
			return
		}
        if (data) {
            setItems(
                data.map((item) => ({
                    ...item,
                    date: new Date(item.date),
                }))
            );
        }
    }, []);

    useEffect(() => {
        if (items.length) {
            localStorage.setItem("data", JSON.stringify(items));
        }
    }, [items]);

    const addItem = (item) => {
        setItems((oldItems) => [
            ...oldItems,
            {
                id:
                    oldItems.length > 0
                        ? Math.max(...oldItems.map((i) => i.id)) + 1
                        : 0,
                text: item.text,
                date: item.date != "" ? Date.parse(item.date) : Date.now(),
                title: item.title,
            },
        ]);
    };

    return (
        <div className='app'>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={items} />
            </LeftPanel>
            <Body>
                <JournalForm submit={addItem} />
            </Body>
        </div>
    );
}

export default App;
