import "./Styles/App.scss";
import AppLayout from "./Components/AppLayout";

function App() {
	return (
		<main className="App">
			<h1 className="main-title">Drone Tracking Dashboard</h1>
			<div className="app-container">
				<AppLayout />
			</div>
		</main>
	);
}

export default App;
