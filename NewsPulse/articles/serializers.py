from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=CustomUser
        fields=('id','username', 'email', 'password', 'role')

    def create(self, validated_data):
        password=validated_data.pop("password")
        """ pop() removes the password from validated_data and stores it in a variable.

            Why remove it?
            Because CustomUser(**validated_data) will try to set password directly on the model.
            If you do that, Django will store the raw password, which is insecure.
            Now validated_data only contains fields like username, email, role """
        
        user=CustomUser(**validated_data)
        # equivalent to above => user = CustomUser(username="john", email="john@example.com", role="editor")
        # ** Unpacks the dictionary of validated data into model fields as per above line
        user.set_password(password)
        #Hashes the password & Stores that hash inside user.password
        user.save()
        return user
    
class PasswordChangeSerializer(serializers.Serializer):
    old_password=serializers.CharField()
    new_password=serializers.CharField()

    def validate_old_password(self,value):
        user=self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old Password is incorrect")
        return value
    
    def save(self, **kwargs):
        user=self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=('id', 'username', 'email', 'role', 'first_name', 'last_name', 'bio', 'profile_picture')
        read_only_fields = ('id', 'role', 'username')
        
       
""" The read_only_fields is a Meta option that makes certain fields read-only:
They can be seen in responses.
They cannot be modified in requests (e.g., during PUT/PATCH update).
id → The user’s primary key. You don’t want clients to send a new ID (it’s auto-generated).
role → Controlled by admin (Author/Editor), not by users themselves.
username → You may want it fixed after signup (to avoid impersonation). """