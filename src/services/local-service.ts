import AsyncStorage from '@react-native-async-storage/async-storage';

const RN_ASSIGNMENT_LOCAL_STORAGE = 'RN_ASSIGNMENT_LOCAL_STORAGE';

class LocalService {
  private save = async (): Promise<void> => {
    try {
      const jsonString = JSON.stringify(this);
      await AsyncStorage.setItem(RN_ASSIGNMENT_LOCAL_STORAGE, jsonString);
    } catch (error) {
      console.log('error', error);
    }
  };

  public load = async (): Promise<void> => {
    const jsonString = await AsyncStorage.getItem(RN_ASSIGNMENT_LOCAL_STORAGE);
    const jsonObject = jsonString ? JSON.parse(jsonString) : '';
    Object.assign(this, jsonObject);
  };
}

const localService = new LocalService();
export {localService};
