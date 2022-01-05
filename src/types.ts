export interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    children?:JSX.Element;
   
}

export interface ModalEdiFoodProps extends ModalProps {
  editingFood:FoodArray;
  handleUpdateFood:(food:DataProps)=> Promise <void>;
}

export interface ModalAddFoodProps extends ModalProps {
  handleAddFood:(food:DataProps) => Promise<void>;
}

export interface DataProps {
    description: string;
    image: string;
    name: string;
    price: string;
    
  }

export interface FoodArray {
  id:number;
  name:string;
  description:string;
  price:string;
  available:boolean;
  image:string;
}

export interface FoodProps {
    key:number;
    food:FoodArray;
    handleDelete:(id:number) => Promise<void>;
    handleEditFood:(food:FoodArray) => void;
}