import PropTypes from 'prop-types'; // Import PropTypes for type validation
import QRCode from "qrcode.react"; // Import the QRCode component

const QRCodeGenerator = ({ adminId }) => {
  if (!adminId) {
    return <div>Loading...</div>; // If adminId is not available, show a loading message
  }

  const url = `http://yourdomain.com/rating?adminId=${adminId}`;

  return (
    <div className="qr-code-container">
      <h2>Scan this QR Code</h2>
      <QRCode value={url} size={256} />
    </div>
  );
};

// Define prop types for the component
QRCodeGenerator.propTypes = {
  adminId: PropTypes.string.isRequired, // Admin ID is required and must be a string
};

export default QRCodeGenerator;