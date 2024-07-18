import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RemoveAnchor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hash) {
            // Remove the anchor tag from the URL
            navigate(window.location.pathname + window.location.search, { replace: true });
        }
    }, [navigate]);

    return null; // This component doesn't need to render anything
};

export default RemoveAnchor;
