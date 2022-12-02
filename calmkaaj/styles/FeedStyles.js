import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const Card = styled.View`
    background-color: #ade6e6;
    border-radius: 30px;
    width: 100%;
    margin-bottom: 20px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    font-family: 'Lato-Regular';
    color: #000;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    color: #000;
`;

export const PostText = styled.Text`
    font-size: 14px;
    font-family: 'Lato-Regular';
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    color: #000;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const Divider = styled.View`
    border-bottom-color: #ade6e6;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 3%;
    margin-bottom: 3%;
    background-color: #44a6c6;
    border-radius: 30px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 1px;
    padding: 1px 1px;
    transition: fill 0.25s;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#fff'};
    margin-top: 5px;
    margin-left: 5px;
`;
