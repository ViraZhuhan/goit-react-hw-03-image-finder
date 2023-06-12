import styled from "@emotion/styled";

export const GalleryList = styled.ul`
display: grid;
max-width: calc(100vw - 48px);
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
grid-gap: 16px;
margin-top: 0;
margin-bottom: 0;
padding: 0;
list-style: none;
margin-left: auto;
margin-right: auto;

@media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
}
@media (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(320px, 1fr));
}
`

export const Li = styled.li`
`
