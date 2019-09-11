import React from 'react';
import { connect } from 'react-redux';

import { fetchSingleAlbum } from '../actions';
class SingleAlbum extends React.Component {
    componentDidMount(){
        this.props.fetchSingleAlbum(this.props.match.params.id, this.props.token)
    }
    renderTracks(){
        return this.props.singleAlbum.tracks.items.map(track => {
            return (
                <div>
                    <h1>{track.name}</h1>
                    <h1>{track.duration_ms}</h1>
                </div>
            )
        })
    }
    render(){
        if(this.props.singleAlbum){
        return(
            <div>
                <h1>{this.props.singleAlbum.name}</h1>
                <h1>{this.props.singleAlbum.label}</h1>
                {this.renderTracks()}
            </div>
        )
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return { token: state.auth.token, singleAlbum: state.user.singleAlbum}
}

export default connect(mapStateToProps, { fetchSingleAlbum })(SingleAlbum);