import styled from 'styled-components';

export const StyledComponents = styled.div`
.custom-select-label {
    display: block;
    color: #333;
  }
  
  .custom-select-input-search{
    width: 100%;
    height: 100%;
    padding: 5px 8px 4px 10px;
  }
  
  .custom-select{
    position: relative;
    width: 100%;
    padding: 0px;
    height: 32px;
    cursor: pointer;
    background: url('') no-repeat right center;
  
  
    border-radius: 4px;
    border: 1px solod #ccc;
    border-width: thin!important;
  }
  
  
  .custom-select-rh247 span {
    max-width: 85%; 
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }
  
  .selected-option {
    display: flex;
    align-items: center;
    padding: 5px 8px 4px 10px;
  }
  
  .options {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    transition: background-color .3s;
    z-index: 999;
  
    max-height: 260px;
    overflow-y: scroll;
  }
  
  .option {
    cursor: pointer; 
    padding: 10px 10px; 
    border-left: 2px solid #37BAD8;
    border-bottom: 1px solid #ccc;
    min-height: 70px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;    
    gap: 2px
  }
  
  .option:hover {
    background-color: #F8F9FA;
  }
  
  .clear-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    color: grey;
  }
  
  .select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  
`;
