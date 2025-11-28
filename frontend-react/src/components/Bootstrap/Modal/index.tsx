import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

type ModalPropsType = {
    data: {
        title?: string
        show: boolean
    },
    actions: {
      close: () => void,
    },
    children: ReactNode;
  }

export default function Index({ data, actions, children }: ModalPropsType ) {
  return (
    <Modal show={data.show} onHide={actions.close} size={'lg'}>
    <Modal.Header closeButton>
      <Modal.Title>
        <h5 className="text-muted">{ data.title || '' }</h5>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{minHeight: '200px'}}>
        {children}
      </div>
    </Modal.Body>
  </Modal>
  )
}
