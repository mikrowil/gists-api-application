import React from "react"
import {Image, Pressable, Text} from "react-native"
import styles from "./styles"

/**
 *	This component is rendered inside the GistList flatlist renderItem.
 *	Displays the users avatar and file name
 *	Can be pressed to handle an onPress event
 */
class GistRenderItem extends React.Component {

	//This component has no state to update
	shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
		return false
	}

	render() {
		const avatarUrl = this.props.gist.owner.avatar_url
		const fileId = Object.keys(this.props.gist.files)[0]

		const filename = this.props.gist.files[fileId].filename

		return (
			<Pressable onPressIn={() => this.props.handleOnPress(avatarUrl)} style={styles.container}>
				<Image style={styles.imageAvatar} source={{uri: `${avatarUrl}`}}/>
				<Text style={styles.txtFileName}>{filename}</Text>
			</Pressable>
		)
	}
}


export default GistRenderItem
