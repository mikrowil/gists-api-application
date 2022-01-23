import {StyleSheet} from "react-native"

export default StyleSheet.create({
	container: {
		height: 100,
		borderBottomWidth: 1,
		borderColor: "#818181",

		flexDirection: "row",
		alignItems: "center",

		padding: 5,
	},
	imageAvatar: {
		height: 70,
		width: 70,

	},
	txtFileName: {
		flex: 1,
		textAlign: "center",
	},
})
