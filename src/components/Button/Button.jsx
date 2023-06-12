import {LoadMoreButton} from './Button.styled'

 const Button = ({ onClick }) => {
    return (
      <LoadMoreButton type="button" onClick={onClick}>
        Load More
      </LoadMoreButton>
    );
  };

  export default Button;

  