import React from 'react';
import RenderFields, { useRenderedFields } from '../../RenderFields';
import withCondition from '../../withCondition';
import FieldTypeGutter from '../../FieldTypeGutter';
import { NegativeFieldGutterProvider } from '../../FieldTypeGutter/context';
import { Props } from './types';

import './index.scss';

const baseClass = 'group';

const Group: React.FC<Props> = (props) => {
  const {
    label,
    fields,
    name,
    path: pathFromProps,
    fieldTypes,
    admin: {
      readOnly,
      style,
      width,
    },
    permissions,
  } = props;

  const { operation } = useRenderedFields();
  const path = pathFromProps || name;

  return (
    <div
      className="field-type group"
      style={{
        ...style,
        width,
      }}
    >
      <FieldTypeGutter />

      <div className={`${baseClass}__content-wrapper`}>
        {label && (
          <h2 className={`${baseClass}__title`}>{label}</h2>
        )}
        <div className={`${baseClass}__fields-wrapper`}>
          <NegativeFieldGutterProvider allow={false}>
            <RenderFields
              permissions={permissions.fields}
              operation={operation}
              readOnly={readOnly}
              fieldTypes={fieldTypes}
              fieldSchema={fields.map((subField) => ({
                ...subField,
                path: `${path}${subField.name ? `.${subField.name}` : ''}`,
              }))}
            />
          </NegativeFieldGutterProvider>
        </div>
      </div>
    </div>
  );
};

export default withCondition(Group);
