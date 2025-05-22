import React from 'react';
import './FeatureRow.css';

function FeatureRow({title, description, rightElement, titleColor = '#1c1b1f'}) {
    return (
        <div className="feature-row">
            <div className="feature-text">
                <h4 style={{color: titleColor}}>{title}</h4>
                <p>{description}</p>
            </div>
            <div className="feature-action">
                {rightElement}
            </div>
        </div>
    );
}

export default FeatureRow;
