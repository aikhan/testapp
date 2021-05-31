import React from 'react';
import {useAppDispatch} from '../hooks';
import {saveAddress, AddressState} from '../addressSlice';
import {Formik, ErrorMessage, FormikHelpers} from 'formik';

import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import * as Yup from 'yup';
import TextInputFloating from './TexInputFloating';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../NavigationStack';
import styles from './css/AddressForm.module.css';

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Address'
>;
type Props = {
  navigation: AddressScreenNavigationProp;
};
// const screenHeight = Dimensions.get('window').height;
const initialValues: AddressState = {
  country: 'Austria',
  name: '',
  street: '',
  postCode: '',
  city: '',
};
const stringOnly = (value: string | undefined) =>
  /^([^0-9]*)$/.test(value as string);
const validationSchema = Yup.object({
  country: Yup.string()
    .test('Charachters only', 'Country name cannot have numbers', stringOnly)
    .required('Required'),
  name: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  postCode: Yup.number()
    .typeError('Invalid Post Code: Numbers Only')
    .required('Required'),
  city: Yup.string().required('Required'),
});

const AddressForm = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: AddressState, submitProps: FormikHelpers<any>) => {
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    dispatch(saveAddress(values));
    navigation.navigate('EmptyScreen');
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => {
        const isValid = !Object.keys(errors).length;
        // https://github.com/formium/formik/issues/1116
        return (
          <ScrollView
            contentContainerStyle={styles.container as StyleProp<ViewStyle>}>
            <View>
              <View>
                <Text style={styles.addressLabel as StyleProp<ViewStyle>}>
                  Address
                </Text>
                <Text style={styles.addressDetailLabel as StyleProp<ViewStyle>}>
                  Please enter your main residence
                </Text>
              </View>
              <View
                style={styles.textInputContainerView as StyleProp<ViewStyle>}>
                <TextInputFloating
                  label="Country"
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  value={values.country}
                  error={
                    errors.country && touched.country ? errors.country : null
                  }
                />
                <ErrorMessage
                  name="country"
                  component={Text}
                  style={styles.errorText}
                />
                <TextInputFloating
                  label="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={errors.name && touched.name ? errors.name : null}
                />
                <ErrorMessage
                  name="name"
                  component={Text}
                  style={styles.errorText}
                />
                <TextInputFloating
                  label="Street Additions"
                  onChangeText={handleChange('street')}
                  value={values.street}
                  onBlur={handleBlur('street')}
                  error={errors.street && touched.street ? errors.street : null}
                />
                <ErrorMessage
                  name="street"
                  component={Text}
                  style={styles.errorText}
                />
                <TextInputFloating
                  label="Post Code"
                  onChangeText={handleChange('postCode')}
                  onBlur={handleBlur('postCode')}
                  value={values.postCode}
                  error={
                    errors.postCode && touched.postCode ? errors.postCode : null
                  }
                />
                <ErrorMessage
                  name="postCode"
                  component={Text}
                  style={styles.errorText}
                />
                <TextInputFloating
                  label="City"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  error={errors.city && touched.city ? errors.city : null}
                />
                <Text style={styles.errorText}>
                  <ErrorMessage name="city" component={Text} />
                </Text>
              </View>
              <View
                style={[
                  isValid
                    ? (styles.buttonNext as StyleProp<ViewStyle>)
                    : [
                        styles.buttonNext as StyleProp<ViewStyle>,
                        {
                          backgroundColor: 'darkgray',
                        },
                      ],
                ]}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => handleSubmit()}>
                  <Text
                    style={[
                      isValid
                        ? (styles.nextButtonLabel as StyleProp<ViewStyle>)
                        : [
                            styles.nextButtonLabel as StyleProp<ViewStyle>,
                            {color: 'gray'},
                          ],
                    ]}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default AddressForm;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexGrow: 1,
//     flexDirection: 'column',
//     // justifyContent: 'flex-start',
//     alignSelf: 'stretch',
//     backgroundColor: '#1F4F8D',
//     minHeight: screenHeight + 200,
//   },
//   errorText: {
//     color: 'red',
//     marginLeft: 16,
//     marginRight: 16,
//     marginTop: 8,
//     fontSize: 16,
//   },
//   textInputContainerView: {
//     alignSelf: 'center',
//     marginTop: 36,
//   },
//   buttonNext: {
//     bottom: 16,
//     // position: 'absolute',
//     alignSelf: 'center',
//     width: '90%',
//     backgroundColor: '#00DCB9',
//     borderRadius: 4,
//     marginTop: screenHeight / 4,
//   },
//   nextButtonLabel: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#007563',
//     padding: 16,
//   },
//   addressLabel: {
//     fontSize: 26,
//     textAlign: 'left',
//     color: 'white',
//     marginLeft: 16,
//     fontFamily: 'SFProText-Semibold',
//     marginTop: 50,
//   },
//   addressDetailLabel: {
//     fontSize: 14,
//     textAlign: 'left',
//     color: 'white',
//     opacity: 0.4,
//     marginLeft: 16,
//     fontFamily: 'SFProText-Regular',
//     marginTop: 6,
//   },
// });
