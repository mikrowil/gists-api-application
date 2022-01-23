import React from "react"
import {SafeAreaView} from "react-native"

//Custom Components
import GistsList from "./src/components/GistsList/GistsList"

/**
 * Entry point for the application
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
	return (
		<SafeAreaView>
			<GistsList/>
		</SafeAreaView>
	)
}


export default App
