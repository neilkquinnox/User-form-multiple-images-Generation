import React, { useContext } from "react";
import CardContext from '../../context/cardContext';
import ImagePreview from "./ImagePreview/ImagePreview";
import UserCard from "./UserCard/UserCard";
import UserForm from './UserForm/UserForm';

function Layout() {
    const cardDetails = useContext(CardContext);
    const { showCard, imageView } = cardDetails.state;
    return (
        <div>
            {(showCard) ? <UserCard /> : imageView ? <ImagePreview /> : <UserForm />} 
        </div>
    );
}

export default Layout;
