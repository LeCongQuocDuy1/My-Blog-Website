import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ContentEditor = ({label, value, changeContentValue, name, invalidFields, setInvalidFields}) => {

  return (
    <div className='flex flex-col'>
      {label && <label className='mb-[5px] block text-left'>{label}</label>}
      <Editor
          apiKey='i8th42xamqdm46gjkb5kf5eryrgskm17xui3zlka40lz4i5z'
          initialValue={value}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
              'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
              'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
            ],
            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onChange={e => changeContentValue(prev => ({...prev, [name]: e.target.getContent()}))}
          onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some(el => el.name === name) && <small className='text-error'>{invalidFields?.find(el => el.name === name).message}</small>}
    </div>
  );
}

export default ContentEditor;
