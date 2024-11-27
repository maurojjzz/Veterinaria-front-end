import React from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import styles from "./App.module.css";

const App = () => {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <Home />
            </main>
            <Footer />
        </div>
    );
};

export default App;

